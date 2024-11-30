import boto3
import uuid
from decimal import Decimal
from app.core.config import AWS_REGION, DYNAMODB_TABLE

dynamo_client = boto3.resource(
    "dynamodb", 
    region_name=AWS_REGION
)
table = dynamo_client.Table(DYNAMODB_TABLE)

def save_quote_to_dynamo(car_make: str, car_model: str, year: int, registration_number: str, premium: float):
    insurance_id = str(uuid.uuid4())
    table.put_item(Item={
        "insurance_id": insurance_id,
        "quote_id": str(uuid.uuid4()),
        "car_make": car_make,
        "car_model": car_model,
        "year": year,
        "registration_number": registration_number,
        "premium": Decimal(str(premium))
    })
    return insurance_id

def get_quotes_from_dynamo():
    try:
        response = table.scan()  # For now, we'll get all quotes. In production, filter by user_id
        items = response.get('Items', [])
        
        # Convert Decimal to float for JSON serialization
        for item in items:
            if 'premium' in item:
                item['premium'] = float(item['premium'])
                
        return items
    except Exception as e:
        raise Exception(f"Failed to fetch quotes: {str(e)}")
