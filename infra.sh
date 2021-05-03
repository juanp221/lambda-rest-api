aws s3api create-bucket --bucket $TF_BUCKET --region us-east-1
aws s3api create-bucket --bucket $SAM_CODE_BUCKET --region us-east-1
sam package --template-file sam/sam-template.yaml --output-template-file sam/sam-deploy.yaml --s3-bucket $SAM_CODE_BUCKET
cd terraform
terraform init
terraform destroy -lock=false -auto-approve
terraform apply -lock=false -auto-approve
