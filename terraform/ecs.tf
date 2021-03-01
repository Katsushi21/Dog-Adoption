resource "aws_ecs_cluster" "dog-adoption-ecs-cluster" {
  name = "dog-adoption-ecs-cluster"
}
resource "aws_ecs_task_definition" "dog-adoption-nginx-ecs-task" {
  family                   = "dog-adoption-nginx-ecs-task"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions    = file("./tasks/nginx_definition.json")
  execution_role_arn = module.ecs_task_execution_role.iam_role_arn
}

resource "aws_ecs_service" "dog-adoption-nginx-ecs-service" {
  name                              = "dog-adoption-nginx-service"
  cluster                           = aws_ecs_cluster.dog-adoption-ecs-cluster.arn
  task_definition                   = aws_ecs_task_definition.dog-adoption-nginx-ecs-task.arn
  desired_count                     = 2
  launch_type                       = "FARGATE"
  platform_version                  = "1.3.0"
  health_check_grace_period_seconds = 60

  network_configuration {
    assign_public_ip = false
    security_groups  = [aws_security_group.nginx_sg.security_group_id]
    subnets          = [aws_subnet.dog-adoption-private.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.dog-adoption-alb-target-group.arn
    container_name   = "dog_adoption_nginx"
    container_port   = "80"
  }

  lifecycle {
    ignore_changes = [task_definition]
  }
}

module "nginx_sg" {
  source      = "./security_group"
  name        = "nginx-sg"
  vpc_id      = aws_vpc.dog-adoption-vpc.id
  port        = 80
  cidr_blocks = [aws_vpc.dog-adoption-vpc.cidr_block]
}








resource "aws_ecs_task_definition" "gadget-api-task" {
  family                   = "gadget-api-task"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions    = file("./tasks/gadget_api_definition.json")
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
}
resource "aws_ecs_service" "gadget-api-ecs-service" {
  name             = "gadget-api-ecs-service"
  cluster          = aws_ecs_cluster.gadget-ecs-cluster.arn
  task_definition  = aws_ecs_task_definition.gadget-api-task.arn
  desired_count    = 1
  launch_type      = "FARGATE"
  platform_version = "1.3.0"

  network_configuration {
    assign_public_ip = true
    security_groups  = [aws_security_group.gadget-ecs-sg.id]
    subnets          = [aws_subnet.gadget-public-1a.id, aws_subnet.gadget-public-1c.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.gadget-alb-api-tg.arn
    container_name   = "api-container"
    container_port   = "3000"
  }
}

resource "aws_ecs_task_definition" "db-create" {
  family                   = "gadget-db-create"
  container_definitions    = file("./tasks/gadget_db_create_definition.json")
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
}
resource "aws_ecs_task_definition" "db-migrate" {
  family                   = "gadget-db-migrate"
  container_definitions    = file("./tasks/gadget_db_migrate_definition.json")
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
}
resource "aws_ecs_task_definition" "db-migrate-reset" {
  family                   = "gadget-db-migrate-reset"
  container_definitions    = file("./tasks/gadget_db_migrate_reset_definition.json")
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
}

##########
#  権限   #
##########
data "aws_iam_policy" "ecs_task_execution_role_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "ecs_task_execution" {
  source_json = data.aws_iam_policy.ecs_task_execution_role_policy.policy

  statement {
    effect    = "Allow"
    actions   = ["ssm:GetParameters", "kms:Decrypt"]
    resources = ["*"]
  }
}

module "ecs_task_execution_role" {
  source     = "./modules/iam_role"
  name       = "ecs-task-execution"
  identifier = "ecs-tasks.amazonaws.com"
  policy     = data.aws_iam_policy_document.ecs_task_execution.json
}
