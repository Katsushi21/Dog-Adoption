resource "aws_cloudwatch_log_group" "dog-adoption-ecs-nginx" {
  name              = "/ecs/nginx"
  retention_in_days = 90
}
resource "aws_cloudwatch_log_group" "gadget-ecs-backend" {
  name              = "/ecs/backend"
  retention_in_days = 90
}
resource "aws_cloudwatch_log_group" "gadget-ecs-db-frontend" {
  name              = "/ecs/frontend"
  retention_in_days = 90
}
