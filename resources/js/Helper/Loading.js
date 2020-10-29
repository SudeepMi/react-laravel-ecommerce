import React from "react";
export const Loading = ({ loading }) => (loading ? <div className="app-loader">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink"  width="191px" height="191px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="0" fill="none" stroke="#e90c59" strokeWidth="2">
  <animate attributeName="r" repeatCount="indefinite" dur="1.0416666666666665s" values="0;18" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5208333333333333s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="1.0416666666666665s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5208333333333333s"></animate>
</circle>
<circle cx="50" cy="50" r="0" fill="none" stroke="#46dff0" strokeWidth="2">
  <animate attributeName="r" repeatCount="indefinite" dur="1.0416666666666665s" values="0;18" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="1.0416666666666665s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline"></animate>
</circle>
</svg>
</div> : null);

export const SmallLoader = ({loading}) => (loading? <div className="loader">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="#e15b64" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
</circle>
</svg>
</div>:null);
