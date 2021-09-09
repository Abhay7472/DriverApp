import { Platform } from 'react-native';
import {
    check,
    request,
    RESULTS,
    requestMultiple,
    PERMISSIONS,
} from 'react-native-permissions';

// This function can be used anywhere as it supports multiple permissions. 
// It checks for permissions and then requests for it.
const PLATFORM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
}
const PLATFORM_PHOTO_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
}
const REQUEST_PERMISSION_TYPE = {
    camera: PLATFORM_CAMERA_PERMISSIONS,
    photo: PLATFORM_PHOTO_PERMISSIONS
}
const PERMISSIONS_TYPE = {
    camera: 'camera',
    photo: 'photo'
}
class AppPermission {
    checkPermission = async (type) => {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        if (!permissions) {
            return true
        }
        try {
            const result = await check(permissions)
            if (result === RESULTS.GRANTED) return true;
            return this.requestPermission(permissions) //request permission  
        } catch (error) {
            return false
        }
    }
    requestPermission = async (permissions) => {
        try {
            const result = await request(permissions);
            return result === RESULTS.GRANTED;
        } catch (error) {
            return false;
        }
    }
    requestMultiple = async (types)=> {
        const results = [];
        for (const type of types) {
            const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
            if (permission) {
                const result = await this.requestPermission(permission);
                results.push(result)
            }
        }
        for (const result of results) {
            if (!result) {
                return false;
            }
            return true;
        }
    }
}
const Permission = new AppPermission();
export { Permission, PERMISSIONS_TYPE }
