import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

describe('user service', () => {
  let service: UserService
  let repository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: vi.fn(),
            findOne: vi.fn(),
            metadata: {
              propertiesMap: {},
            },
          },
        },
      ],
    }).compile()

    service = module.get(UserService)
    repository = module.get(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('create user', () => {
    it('should create user correctly', async () => {
      const user = { email: 'mutoe@foxmail.com', username: 'mutoe', password: '12345678' }
      await service.createUser(user)

      expect(repository.save).toHaveBeenCalledWith(Object.assign(new UserEntity(), user))
    })
  })

  describe('find user', () => {
    it('should find user correctly', async () => {
      const user = { email: 'mutoe@foxmail.com', username: 'mutoe' }
      vi.spyOn(repository, 'findOne').mockResolvedValue(user as UserEntity)
      const userResult = await service.findUser({ username: user.username })

      expect(userResult).toBe(user)
      expect(userResult).not.toHaveProperty('password')
      expect(repository.findOne).toHaveBeenCalledWith({ where: { username: user.username } })
    })

    it('should find user without password when pass withoutPassword true', async () => {
      const user = { email: 'mutoe@foxmail.com', username: 'mutoe', password: '12345678' }
      vi.spyOn(repository, 'findOne').mockResolvedValue(user as UserEntity)
      repository.metadata.propertiesMap = { username: 'username', password: 'password' }
      const userResult = await service.findUser({ username: user.username }, true)

      expect(userResult).toHaveProperty('password', '12345678')
    })
  })
})
