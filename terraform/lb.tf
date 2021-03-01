resource "aws_lb" "dog-adoption-alb" {
  name                       = "dog-adoption-alb"
  load_balancer_type         = "application"
  internal                   = false
  idle_timeout               = 60
  enable_deletion_protection = true

  subnets = [
    aws_subnet.dog-adoption-public.id,
  ]

  access_logs {
    bucket = aws_s3_bucket.dog-adoption-log.id
    enabled = true
  }

  security_groups = [
    module.http_sg.security_group_id,
    module.https_sg.security_group_id,
    module.http_redirect_sg.security_group_id,
  ]

  tags = {
    Name = "dog-adoption-alb"
  }
}

output "dog-adoption-dns-name" {
  value = aws_lb.dog-adoption-alb.dns_name
}
