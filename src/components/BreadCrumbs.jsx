const BreadCrumbs = ({step}) => {
  const bColor = (step === 2) ? "#ccc" : "#93bfec"; 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", fontSize: "0.8rem" }}><div><span><span style={{ color: "white", background: "#93bfec", borderRadius: "50%", padding: "0.2rem" }}>&#x2713;</span>&nbsp;Generate palette&nbsp;<span style={{ color: "#ccc" }}>&mdash;&mdash;&mdash;</span></span><span>&nbsp;&nbsp;<span style={{ color: "white", background: "#93bfec", borderRadius: "50%", padding: "0.2rem" }}>&#x2713;</span>&nbsp;Match colors&nbsp;&mdash;&mdash;&mdash;</span><span>&nbsp;&nbsp;<span style={{ color: "white", background: `${bColor}`, borderRadius: "50%", padding: "0.2rem" }}>&#x2713;</span>&nbsp;Save</span></div></div>
  )
}

export default BreadCrumbs;