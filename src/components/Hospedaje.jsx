function Hospedaje() {
  return (
    <section className="section cream" id="hospedaje">
      <div className="section-heading">
        <div>
          <p className="eyebrow">HOSPEDAJE</p>
          <h2>Cabañas, glamping y suites</h2>
        </div>
        <p>Empieza por nuestras cabañas eco y glamping en el bosque. También tenemos suites para quien prefiera habitación tradicional.</p>
      </div>

      <div className="cards lodging">
        <article className="card lodging-card">
          <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85" alt="Cabaña de madera" />
          <div className="card-body">
            <span className="tag">PAREJA · NATURALEZA</span>
            <h3>Cabaña Eco</h3>
            <p>Cabaña de madera y guadua para dos personas. Techo de palma, hamaca interior y acceso a jacuzzi.</p>
            <div className="price">Desde $660.000 <small>COP</small></div>
            <small>2 planes disponibles</small>
            <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
          </div>
        </article>

        <article className="card lodging-card">
          <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85" alt="Cabaña en naturaleza" />
          <div className="card-body">
            <span className="tag">FAMILIAR</span>
            <h3>Cabaña Alpina</h3>
            <p>Cabaña amplia en guadua para grupos y familias. Dos niveles con hamacas, zona BBQ y jacuzzi.</p>
            <div className="price">Desde $1.400.000 <small>COP</small></div>
            <small>1 plan disponible</small>
            <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
          </div>
        </article>

        <article className="card lodging-card">
          <img src="https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=900&q=85" alt="Glamping rodeado de naturaleza" />
          <div className="card-body">
            <span className="tag">PAREJA · DOMO</span>
            <h3>Glamping</h3>
            <p>Domo geodésico en el bosque con jacuzzi privado. Comodidad campestre y experiencias al aire libre.</p>
            <div className="price">Desde $760.000 <small>COP</small></div>
            <small>1 plan disponible</small>
            <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
          </div>
        </article>

        <article className="card lodging-card">
          <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85" alt="Suite de hotel" />
          <div className="card-body">
            <span className="tag">HOTEL</span>
            <h3>Mini Suite</h3>
            <p>Tres tipos de mini suite para elegir según tu plan y preferencia. Ideal para parejas o estadías corporativas.</p>
            <div className="price">Desde $336.000 <small>COP</small></div>
            <small>2 planes disponibles</small>
            <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
          </div>
        </article>

        <article className="card lodging-card">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85" alt="Suite principal" />
          <div className="card-body">
            <span className="tag">PREMIUM</span>
            <h3>Suite Principal</h3>
            <p>Suite amplia con sala de estar, hamaca interior y vista al jardín tropical.</p>
            <div className="price">Desde $480.000 <small>COP</small></div>
            <small>1 plan disponible</small>
            <div className="card-actions"><a className="btn btn-outline" href="#contacto">Ver más</a><a className="btn btn-primary" href="#contacto">Reservar</a></div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Hospedaje;
