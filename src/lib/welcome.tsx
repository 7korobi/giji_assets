import React from 'react'

const { url } = require('../../../giji/config/yaml/live.yml')

function CTalk() {
  return (
    <table className="mes_nom">
      <tbody>
        <tr className="say">
          <td className="img">
            <img
              src="http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/portrate/w59.jpg"
              width="90"
              height="130"
              alt=""
            />
          </td>
          <td className="field">
            <div className="msg">
              <h3 className="mesname">ようこそ！</h3>
              <p className="mes_text"></p>
              <p className="mes_date"> (35) 2020/10/18(Sun) 01時半頃</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function Export() {
  return (
    <div id="export" className="form">
      <div className="welcome-btns cap">ロビー</div>
      <div className="welcome-btns cap">夢の形、陰謀</div>
      <div className="welcome-btns cap">ＲＰ</div>
      <div className="welcome-links form tap">
        <p>
          <a href="http://crazy-crazy.sakura.ne.jp/giji_lobby/lobby/sow.cgi" className="MOB">
            lobby<sup>3</sup>
          </a>
        </p>
        <p>
          <a>offparty</a>
        </p>
        <p>
          10村:<a href="http://---/giji_lobby/lobby/sow.cgi">hello</a>
        </p>
      </div>
      <div className="welcome-links form">
        <p>
          <a>wolf</a>
        </p>
        <p>
          <a>ultimate</a>
        </p>
        <p>
          <a>allstar</a>
        </p>
        <p>
          <a>morphe</a>
        </p>
        <p>
          <a>cafe</a>
        </p>
      </div>
      <div className="welcome-links form">
        <p>
          <a>role-play</a>
        </p>
        <p>
          <a>RP-advance</a>
        </p>
        <p>
          2村:<a href="http://perjury.rulez.jp/sow.cgi">perjury</a>
        </p>
        <p>
          3村:<a href="http://xebec.x0.to/xebec/sow.cgi">xebec</a>
        </p>
        <p>
          <a className="EVIL">
            crazy<sup>1</sup>
          </a>
        </p>
        <p>
          2村:
          <a href="http://ciel.moo.jp/cheat/sow.cgi" className="EVIL">
            ciel<sup>1</sup>
          </a>
        </p>
        <p>
          2村:<a href="http://---/crazy/sow.cgi">dais</a>
        </p>
      </div>
      <div className="welcome-btns col4">
        <a className="btn"> 終了した村</a>
        <a className="btn active">進行中の村</a>
      </div>
      <div className="welcome-btns col4 shoe">
        <a href="https://giji.f5.si/">総合トップ</a>
      </div>
    </div>
  )
}

function BtnsSow() {
  return (
    <div className="btns">
      <span className="width">
        <a>480</a>
        <a className="active">800</a>
      </span>
      <span className="theme">
        <a>漆黒</a>
        <a className="active">煉瓦</a>
        <a> 闇夜</a>
        <a> 蒼穹</a>
        <a> 和の国</a>
        <a href="sow.cgi?ua=mb">携帯</a>
      </span>
    </div>
  )
}

export function Welcome() {
  const style = {
    backgroundImage: `url(${url.assets}/images/bg/fhd-giji.png)`,
    backgroundPosition: `left 50% top ${-top / 3}px`,
  }
  return (
    <div>
      <div id="welcome" style={style}>
        <Export />
        <h1 className="title-bar">
          <a href="/" className="nuxt-link-active">
            人狼議事
          </a>
        </h1>
        <BtnsSow />

        <div className="filmline"></div>
        <div className="outframe_navimode">
          <div className="contentframe_navileft">
            <img
              src="http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/bg/film-end.png"
              className="filmend"
            />
          </div>
        </div>
      </div>
      <CTalk />
    </div>
  )
}
