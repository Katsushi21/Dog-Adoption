resource "aws_kms_key" "dog-adoption-key" {
  description             = "dog-adoption master key"
  enable_key_rotation     = true
  is_enabled              = true
  deletion_window_in_days = 30
}

resource "aws_kms_alias" "dog-adoption-key-alias" {
  name = "alias/dog-adoption-key"
  target_key_id = aws_kms_key.dog-adoption-key.id
}