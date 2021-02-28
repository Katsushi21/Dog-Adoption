//プライベートネットワークの設定
resource "aws_route_table" "dog-adoption-private" {
  vpc_id = aws_vpc.dog-adoption-vpc.id

  tags = {
    Name = "dog-adoption-public"
  }
}

resource "aws_route_table_association" "dog-adoption-private" {
  subnet_id      = aws_subnet.dog-adoption-private.id
  route_table_id = aws_route_table.dog-adoption-private.id
}

resource "aws_route" "dog-adoption-private" {
  route_table_id         = aws_route_table.dog-adoption-private.id
  nat_gateway_id         = aws_eip.dog-adoption-eip.id
  destination_cidr_block = "0.0.0.0/0"
}