import React from 'react';

const Hint = () => (
  <div className='alert alert-warning alert-dismissible fade show' role='alert'>
    <strong>提示：</strong> 组件功能还在完善中，已支持功能请参考下方实例！
    <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
      <span aria-hidden='true'>&times;</span>
    </button>
  </div>
);

export { Hint };
