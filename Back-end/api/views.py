from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint for container and API monitoring.
    """
    return Response({
        "status": "ok",
        "message": "DM-Website Django API is running successfully."
    })
