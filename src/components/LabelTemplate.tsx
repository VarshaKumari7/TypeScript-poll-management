export default function LabelTemplate(iconName: string) {
  return function template(data: any) {
    return (
      <div>
        <i className={`dx-icon dx-icon-${iconName}`}></i>
        {data.text}
      </div>
    );
  };
}
