import WindowComponent from 'react-flexi-window';

export default function DemoPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <WindowComponent
        w={400}
        h={300}
        x={100}
        y={100}
        windowColor="blue-500/20"
        windowBorderRadius="lg"
        boundary={true}
      >
        <div style={{ padding: '20px' }}>
          <h2>My Window</h2>
          <p>Drag and resize me!</p>
        </div>
      </WindowComponent>
    </div>
  );
}
