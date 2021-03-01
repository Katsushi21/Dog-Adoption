resource "aws_route53_zone" "dog-adoption-zone" {
  name    = "dog-adoption.com"
  comment = "dog-adoption.com host zone"
}

resource "aws_route53_record" "dog-adoption-host-zone-record" {
  zone_id = aws_route53_zone.dog-adoption-zone.zone_id
  name    = aws_route53_zone.dog-adoption-zone.name
  type    = "A"

  alias {
    name                   = aws_lb.dog-adoption-alb.dns_name
    zone_id                = aws_lb.dog-adoption-alb.zone_id
    evaluate_target_health = true
  }
}

output "domain_name" {
  value = aws_route53_record.dog-adoption-host-zone-record.name
}
