/* eslint-disable react/prop-types */


export default function Alerts({alerta}) {
  return (
    <div className={`${alerta.error ? 'bg-danger' : 'header'} p-2 rounded text-center text-white text-uppercase fw-bold`}>
        {alerta.msg}
    </div>
  )
}
