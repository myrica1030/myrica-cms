import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ApiPropertyRichText } from 'common/decorator/api-property.decorator'

export class CreateArticleDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Lorem ipsum' })
  readonly title: string

  @ApiPropertyRichText()
  readonly content?: string

  @ApiPropertyOptional({ example: 1 })
  readonly categoryId?: number

  @ApiPropertyOptional({ example: ['semantic-ui', 'material-ui'] })
  readonly tags?: string[]
}
