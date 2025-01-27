import { useState, useEffect } from 'react';
import * as Network from 'expo-network';
import useAlert from './useAlert';

export const useNetInfo = () => {
  const [isConnected, setIsConnected] = useState(true);
  const alert = useAlert();

  useEffect(() => {
    const checkConnection = async () => {
      const networkState = await Network.getNetworkStateAsync();
      if (isConnected !== networkState.isConnected) {
        setIsConnected(networkState.isConnected);
        if (!networkState.isConnected) {
          alert(
            'Bağlantı Hatası',
            'İnternet bağlantınız bulunmuyor. Lütfen bağlantınızı kontrol edip tekrar deneyin.'
          );
        }
      }
    };

    const interval = setInterval(checkConnection, 3000); // Check every 3 seconds
    checkConnection(); // Initial check

    return () => clearInterval(interval);
  }, [isConnected]);

  return isConnected;
};

export default useNetInfo; 