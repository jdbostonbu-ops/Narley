import * as Location from "expo-location";

export type UserLocation = {
  latitude: number;
  longitude: number;
};

export const getUserLocation = async (): Promise<UserLocation | null> => {
  try {
    const permission = await Location.requestForegroundPermissionsAsync();

    if (permission.status !== Location.PermissionStatus.GRANTED) {
      return null;
    }

    const currentPosition = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude,
    };
  } catch {
    return null;
  }
};
