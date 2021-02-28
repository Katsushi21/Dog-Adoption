resource "aws_eip" "dog-adoption-eip" {
  vpc        = true
  depends_on = [aws_internet_gateway.dog-adoption-int-gateway]

  tags = {
    Name = "dog-adoption-eip"
  }
}

resource "aws_nat_gateway" "dog-adoption-nat-gateway" {
  allocation_id = aws_eip.dog-adoption-eip.id
  subnet_id     = aws_subnet.dog-adoption-public.id
  depends_on    = [aws_internet_gateway.dog-adoption-int-gateway]

  tags = {
    Name = "dog-adoption-nat-gateway"
  }
}