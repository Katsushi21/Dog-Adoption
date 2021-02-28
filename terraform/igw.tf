resource "aws_internet_gateway" "dog-adoption-int-gateway" {
  vpc_id = aws_vpc.dog-adoption-vpc.id

  tags = {
    Name = "dog-adoption-int-gateway"
  }
}
