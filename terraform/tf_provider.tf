# ----------------------------------------------------------------------
# AWS Provider
# ----------------------------------------------------------------------
provider "aws" {
  region = var.aws_region
}

terraform {
  backend "s3" {
    bucket         = "lambdas-api-terraform-state"
    key            = "lambdas-api.tfstate"
    dynamodb_table = "my-terraform-lock"
    region         = "us-east-1"
    encrypt        = "true"
  }
}
