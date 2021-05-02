
variable "aws_region" {
  default = "us-east-1"
}

variable "app_name" {
  default = "lambdas-api"
}

variable "api_lambda_functions" {
  default = [
    "get-data",
    "put-data"
  ]
}

variable "lambda_invoke_uri_prefix" {
  default = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions"
}

variable "sam_code_bucket" {
  default = "lambda-apis-sam-code-bucket"
}
