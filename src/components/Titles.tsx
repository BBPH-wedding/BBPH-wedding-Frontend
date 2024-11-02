interface TitleWithContentProps {
  title: string;
  color?: string;
  size?: 'small' | 'large'
}

const Titles: React.FC<TitleWithContentProps> = ({ title, color, size = 'large' }) => {
    
    const sizeClasses = {
      small: 'text-2xl lg:text-3xl',
      large: 'text-5xl lg:text-7xl',
    };
  
    return (
      <h1 className={`font-[silk] ${sizeClasses[size]} ${color || ""}`}>
        {title}
      </h1>
    );
  };

export default Titles;
