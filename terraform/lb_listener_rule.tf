resource "aws_lb_listener_rule" "dog-adoption-alb-listener-rule" {
  listener_arn = aws_lb_listener.http.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.dog-adoption-alb-target-group.arn
  }

  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}