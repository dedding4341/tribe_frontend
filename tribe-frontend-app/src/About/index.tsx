import React from 'react';

// TODO: THIS NEEDS TO BE REFACTORED INTO SMALLER COMPONENTS
function About() {
  return (
    <section id="about">

      <div className="container about-intro">

        <div className="row mb-5">
          <h1 className="intro-header col-5" data-aos="fade-up">About Our App</h1>
          <p className="lead col-7" data-aos="fade-up">
            Excepteur enim magna veniam labore veniam sint. Ex aliqua esse proident ullamco voluptate. Nisi nisi nisi aliqua eiusmod dolor dolor proident deserunt occaecat elit Lorem reprehenderit. Id culpa veniam ex aliqua magna elit pariatur do nulla. Excepteur enim magna veniam labore veniam sint.
          </p>
        </div>

      </div>

      <div className="container about-features">

        <div className="features-list row group">

          <div className="bgrid feature col-4" data-aos="fade-up">

            <span className="icon"><i className="icon-window"></i></span>

            <div className="service-content">

              <h3>Fully Resposive</h3>

              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                        </p>

            </div>

          </div>

          <div className="bgrid feature col-4" data-aos="fade-up">

            <span className="icon"><i className="icon-image"></i></span>

            <div className="service-content">
              <h3>Retina Ready</h3>

              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                        </p>


            </div>

          </div>

          <div className="feature col-4" data-aos="fade-up">

            <span className="icon"><i className="icon-paint-brush"></i></span>

            <div className="service-content">
              <h3>Stylish Design</h3>

              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                        </p>

            </div>

          </div>

          <div className="bgrid feature col-4" data-aos="fade-up">

            <span className="icon"><i className="icon-file"></i></span>

            <div className="service-content">
              <h3>Clean Code</h3>

              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                        </p>

            </div>

          </div>

          <div className="bgrid feature col-4" data-aos="fade-up">

            <span className="icon"><i className="icon-sliders"></i></span>

            <div className="service-content">
              <h3>Easy To Customize</h3>

              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                        </p>
            </div>

          </div>

          <div className="bgrid feature col-4" data-aos="fade-up">

            <span className="icon"><i className="icon-gift"></i></span>

            <div className="service-content">
              <h3>Free of Charge</h3>

              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                        </p>

            </div>

          </div>

        </div>

      </div>

      <div className="container about-how mb-5">

        <div className="row">
          <h1 className="intro-header col-12 mt-5 mb-5">How The App Work?</h1>
        </div>
        <div className="about-how-steps row">

          <div className="col-6" >
            <h3>Sign-Up</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          <div className="col-6">
            <h3>Upload</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          <div className="col-6" >
            <h3>Create</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          <div className="col-6" >
            <h3>Publish</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>


        </div>

      </div>
    </section>
  )
}

export default About;