//パブリックネットワークの設定
resource "aws_route_table" "dog-adoption-public" {
  vpc_id = aws_vpc.dog-adoption-vpc.id

  route {
    gateway_id = aws_internet_gateway.dog-adoption-int-gateway.id
    cidr_block = "0.0.0.0/0"
  }

  tags = {
    Name = "dog-adoption-public"
  }
}

resource "aws_route" "dog-adoption-public" {
  route_table_id         = aws_route_table.dog-adoption-public.id
  gateway_id             = aws_internet_gateway.dog-adoption-int-gateway.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_route_table_association" "dog-adoption-public" {
  subnet_id      = aws_subnet.dog-adoption-public.id
  route_table_id = aws_route_table.dog-adoption-public.id
}