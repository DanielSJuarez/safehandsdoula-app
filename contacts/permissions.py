from ast import Delete
from rest_framework import permissions

class IsDoulaOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS: 
            return True
        if request.method == 'DELETE':
            return False
        return obj.doula.user == request.user

    
        