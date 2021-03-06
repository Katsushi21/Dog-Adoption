#########
#  ECR  #
#########

#__________  api  __________#
resource "aws_ecr_repository" "dog-adoption-backend" {
  name = "dog-adoption-backend"
}
resource "aws_ecr_lifecycle_policy" "dog-adoption-backend-policy" {
  repository = aws_ecr_repository.dog-adoption-backend.name

  policy = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep last 30 release tagged images",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": ["latest"],
          "countType": "imageCountMoreThan",
          "countNumber": 30
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
EOF
}

#__________ front __________#
resource "aws_ecr_repository" "dog-adoption-front" {
  name = "dog-adoption-front"
}
resource "aws_ecr_lifecycle_policy" "dog-adoption-front-policy" {
  repository = aws_ecr_repository.dog-adoption-front.name

  policy = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep last 30 release tagged images",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": ["latest"],
          "countType": "imageCountMoreThan",
          "countNumber": 30
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
EOF
}