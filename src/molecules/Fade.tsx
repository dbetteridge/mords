import React from "preact/compat";

type Props = {
  children: any;
};

const Fade = ({ children }: Props) => {
  return (
    <div class="opacity-50 bg-white-200 z-1">
      {(children.length ? children : [children]).map((child: any) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { disabled: true });
        }
        return child;
      })}
    </div>
  );
};

export default Fade;
