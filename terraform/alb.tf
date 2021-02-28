resource "aws_lb" "dog-adoption-alb" {
  name                       = "dog-adoption-alb"
  load_balancer_type         = "application"
  internal                   = false
  idle_timeout               = 60
  enable_deletion_protection = false

  subnets = [
    aws_subnet.dog-adoption-public.id,
  ]

  access_logs {
    bucket = aws_s3_bucket.dog-adoption-log.id
    enabled = true
  }

  security_groups = [
    aws_security_group.
  ]

  tags = {
    Name = "dog-adoption-alb"
  }
}
