import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

const NAVY='#0a0f1a', CYAN='#00d4d4', WHITE='#f8fafa', RED='#e22a2a', CELESTE='#78b4eb';

export const Reel: React.FC<{foto:string;titulo:string;precio:string;sub:string;badge:string}> =
({foto,titulo,precio,sub,badge})=>{
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const zoom=interpolate(frame,[0,150],[1.0,1.12]);          // ken-burns lento
  const badgeIn=spring({frame:frame-10,fps,config:{damping:12}});
  const precioIn=spring({frame:frame-30,fps,config:{damping:12}});
  const tituloOp=interpolate(frame,[18,34],[0,1],{extrapolateRight:'clamp'});
  const subOp=interpolate(frame,[45,60],[0,1],{extrapolateRight:'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor:NAVY}}>
      <AbsoluteFill style={{transform:`scale(${zoom})`}}>
        <Img src={staticFile(foto)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
      </AbsoluteFill>
      {/* scrims */}
      <AbsoluteFill style={{background:'linear-gradient(to bottom, rgba(10,15,26,.55) 0%, rgba(10,15,26,0) 22%, rgba(10,15,26,0) 55%, rgba(10,15,26,.92) 100%)'}}/>
      {/* marco marca */}
      <AbsoluteFill style={{border:`14px solid ${CYAN}`}}/>
      {/* header */}
      <div style={{position:'absolute',top:54,width:'100%',textAlign:'center',color:CYAN,fontFamily:'sans-serif',fontWeight:800,fontSize:56,letterSpacing:8}}>ALL IMPORT</div>
      <div style={{position:'absolute',top:128,width:'100%',textAlign:'center',color:WHITE,fontFamily:'sans-serif',fontWeight:700,fontSize:34}}>Córdoba · Entrega en mano</div>
      {/* badge urgencia */}
      <div style={{position:'absolute',top:200,width:'100%',textAlign:'center',transform:`scale(${badgeIn})`}}>
        <span style={{background:RED,color:WHITE,fontFamily:'sans-serif',fontWeight:800,fontSize:44,padding:'16px 40px',borderRadius:60,display:'inline-block'}}>{badge}</span>
      </div>
      {/* bloque inferior */}
      <div style={{position:'absolute',bottom:420,width:'100%',textAlign:'center',color:WHITE,fontFamily:'sans-serif',fontWeight:800,fontSize:80,opacity:tituloOp,padding:'0 40px',boxSizing:'border-box'}}>{titulo}</div>
      <div style={{position:'absolute',bottom:250,width:'100%',textAlign:'center',transform:`scale(${precioIn})`}}>
        <span style={{background:CYAN,color:NAVY,fontFamily:'sans-serif',fontWeight:800,fontSize:108,padding:'18px 56px',borderRadius:80,display:'inline-block'}}>{precio}</span>
      </div>
      <div style={{position:'absolute',bottom:170,width:'100%',textAlign:'center',color:WHITE,fontFamily:'sans-serif',fontWeight:700,fontSize:52,opacity:subOp}}>{sub}</div>
      <div style={{position:'absolute',bottom:90,width:'100%',textAlign:'center',color:CELESTE,fontFamily:'sans-serif',fontWeight:700,fontSize:40,opacity:subOp}}>Escribinos por WhatsApp</div>
    </AbsoluteFill>
  );
};
