resource "aws_s3_bucket" "dog-adoption-media" {
  bucket = "dog-adoption-media"
  acl    = "public-read"

  cors_rule {
    allowed_origins = ["*"]
    allowed_methods = ["GET"]
    allowed_headers = ["*"]
  }

  tags = {
    Name = "dog-adoption-media"
  }
}

resource "aws_s3_bucket" "dog-adoption-log" {
  bucket = "dog-adoption-log"

  lifecycle_rule {
    enabled = true

    expiration {
      days = "90"
    }
  }
}

resource "aws_s3_bucket_policy" "dog-adoption-log" {
  bucket = aws_s3_bucket.dog-adoption-log.id
  policy = data.aws_iam_policy_document.dog-adoption-log.json
}

data "aws_iam_policy_document" "dog-adoption-log" {
  statement {
    effect    = "Allow"
    actions   = ["s3:PutObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.dog-adoption-log.id}/*"]

    principals {
      identifiers = ["498891930781"]
      type        = "AWS"
    }
  }
}