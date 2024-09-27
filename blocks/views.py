from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Block
from .serializers import BlockSerializer

@api_view(['GET', 'POST'])
def block_list(request):
    if request.method == 'GET':
        blocks = Block.objects.all()
        serializer = BlockSerializer(blocks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BlockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def clear_all(request):
    Block.objects.all().delete()
    return Response({'status': 'all data cleared'}, status=204)
