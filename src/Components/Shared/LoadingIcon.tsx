const LoadingIcon = ({ percentage, children }: {percentage:number, children:JSX.Element}) => {
  const clipPathStyle = {
    clipPath: `inset(${100 - percentage}% 0 0 0)`, // This will clip the icon to show the percentage you want
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Background icon with reduced opacity */}
      <div style={{ opacity: 0.3 }}>
        {children}
      </div>
      {/* Foreground icon with clip path */}
      <div className='top-0 left-0 absolute transition-all duration-500' style={{...clipPathStyle}}>
        {children}
      </div>
    </div>
  );
};

export default LoadingIcon;
