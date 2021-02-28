resource "aws_subnet" "dog-adoption-public" {
  vpc_id                  = aws_vpc.dog-adoption-vpc.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "dog-adoption-public"
  }
}
resource "aws_subnet" "dog-adoption-private" {
  vpc_id                  = aws_vpc.dog-adoption-vpc.id
  cidr_block              = "10.0.64.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = false

  tags = {
    Name = "dog-adoption-private"
  }
}


###############
# SubnetGroup #
###############
resource "aws_db_subnet_group" "gadget-rds-subnet-group" {
  name        = "gadget-rds-subnet-group"
  description = "rds subnet for gadget"
  subnet_ids  = [aws_subnet.gadget-private-1a.id, aws_subnet.gadget-private-1c.id]
}
