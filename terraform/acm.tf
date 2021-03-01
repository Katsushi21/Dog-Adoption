resource "aws_acm_certificate" "dog-adoption-acm" {
  domain_name               = aws_route53_record.dog-adoption-host-zone-record.name
  subject_alternative_names = []
  validation_method         = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_route53_record" "dog-adoption-certificate" {
  name    = tolist(aws_acm_certificate.dog-adoption-acm.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.dog-adoption-acm.domain_validation_options)[0].resource_record_type
  records = [tolist(aws_acm_certificate.dog-adoption-acm.domain_validation_options)[0].resource_record_value]
  zone_id = aws_route53_zone.dog-adoption-zone.id
  ttl     = 60
}


resource "aws_acm_certificate_validation" "dog-adoption-acm-validation" {
  certificate_arn         = aws_acm_certificate.dog-adoption-acm.arn
  validation_record_fqdns = [aws_route53_record.dog-adoption-certificate.fqdn]
}
