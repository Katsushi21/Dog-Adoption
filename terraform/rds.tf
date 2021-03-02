resource "aws_db_parameter_group" "dog-adoption-db_pg" {
  name   = "dog-adoption-db_pg"
  family = "postgres12.3"

  parameter {
    name  = "character_set_database"
    value = "utf8mb4"
  }

  parameter {
    name  = "character_set_server"
    value = "utf8mb4"
  }
}

resource "aws_db_option_group" "dog-adoption-db_og" {
  name                 = "dog-adoption-db_og"
  engine_name          = "postgres"
  major_engine_version = "12.3"
}

resource "aws_db_subnet_group" "dog-adoption-db_subnet_group" {
  name       = "dog-adoption-db_subnet_group"
  subnet_ids = [aws_subnet.dog-adoption-private]
}

resource "aws_db_instance" "dog-adoption-db" {
  allocated_storage       = 20
  instance_class          = "db.t3.micro"
  engine                  = "postgres"
  engine_version          = "12.3"
  storage_type            = "gp2"
  username                = "postgres"
  password                = "password"
  backup_retention_period = 7
  copy_tags_to_snapshot   = true
  max_allocated_storage   = 200
  skip_final_snapshot     = true
  port                    = "5432"
  vpc_security_group_ids  = [module.postgres_sg.security_group_id]
  parameter_group_name    = aws_db_parameter_group.dog-adoption-db_pg.name
  option_group_name       = aws_db_option_group.dog-adoption-db_og.name
  db_subnet_group_name    = aws_db_subnet_group.dog-adoption-db_subnet_group.name

  lifecycle {
    prevent_destroy = false
  }

}

module "postgres_sg" {
  source = "./security_group"
  name = "postgres-sg"
  vpc_id = aws_vpc.dog-adoption-vpc.id
  port = 5432
  cidr_blocks = [aws_vpc.dog-adoption-vpc.cidr_block]
}
