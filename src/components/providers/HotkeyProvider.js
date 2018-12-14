import React, { useEffect } from 'react';

const HotkeyProvider = ({ onKeyUp, children }) => {
  const modifierKeys = [
    'Meta',
    'Super',
    'Control',
    'Alt',
    'Shift',
    'CapsLock',
    'Fn'
  ];

  const _onKeyUp = event => {
    if (!modifierKeys.includes(event.key)) {
      onKeyUp({
        event,
        keyCode: event.keyCode,
        modifierKeys: modifierKeys.reduce((obj, key) => ({
          ...obj,
          [key]: event.getModifierState(key)
        }))
      });
    }
  };

  useEffect(
    () => {
      window.addEventListener('keyup', _onKeyUp);
      return () => {
        window.removeEventListener('keyup', _onKeyUp);
      };
    },
    [onKeyUp]
  );

  return <div>{children}</div>;
};

export default HotkeyProvider;
