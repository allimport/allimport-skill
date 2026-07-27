import {Composition} from 'remotion';
import {Reel} from './Reel';
export const RemotionRoot: React.FC = () => (
  <Composition
    id="Reel"
    component={Reel}
    durationInFrames={150}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      foto: 'producto.jpg',
      titulo: 'Figus del Mundial 2026',
      precio: '$3.000 c/u',
      sub: 'Desde 10u → $2.500 c/u',
      badge: 'ÚLTIMAS · NO TRAEMOS MÁS',
    }}
  />
);
