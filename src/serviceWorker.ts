import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { useStore } from './stores/drawStore';

const installServiceWorker = () => {
  const gameDataSetUpdate = useStore((state) => state.gameDataSetUpdate);

  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install({
      onUpdateReady: () => {
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated: () => {
        gameDataSetUpdate(true);
      },
    });
  }
};

export default installServiceWorker;
