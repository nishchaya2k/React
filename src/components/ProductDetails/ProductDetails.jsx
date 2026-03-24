import React, { useState, useRef } from "react";
import "./ProductDetails.css";

const images = [
  "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
  "https://camo.githubusercontent.com/5e45bc648dba68520ce949a53690af6bcef2880f84a1d46cbb1636649afd6d84/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d313032312e6a7067",
  "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
  "https://camo.githubusercontent.com/5e45bc648dba68520ce949a53690af6bcef2880f84a1d46cbb1636649afd6d84/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d313032312e6a7067",
];

const sizes = [
  { label: "Single Pack (50gm)", price: "₹449", usp: "₹8.98/g" },
  { label: "Single Pack (80gm)", price: "₹599", usp: "₹7.49/g" },
  { label: "Pack of 2 (80gm)", price: "₹838", usp: "₹5.24/g" },
  { label: "Single Pack (125gm)", price: "₹699", usp: "₹5.59/g" },
  { label: "Single Pack (125gm)", price: "₹699", usp: "₹5.59/g" },
  { label: "Single Pack (125gm)", price: "₹699", usp: "₹5.59/g" },
];

export default function ProductDetails() {
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const thumbsRef = useRef(null);
  const sizesRef = useRef(null);

  function prevImg() {
    setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function nextImg() {
    setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  function scrollThumbs(offset = 150) {
    if (thumbsRef.current) thumbsRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }

  function scrollSizes(offset = 150) {
    if (sizesRef.current) sizesRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }

  function selectSize(index) {
    setSelectedSize(index);
    // scroll the selected size into view
    const node = sizesRef.current && sizesRef.current.children && sizesRef.current.children[index];
    if (node && node.scrollIntoView) {
      node.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  function prevSize() {
    const next = Math.max(0, selectedSize - 1);
    selectSize(next);
  }

  function nextSize() {
    const next = Math.min(sizes.length - 1, selectedSize + 1);
    selectSize(next);
  }

  return (
    <div className="pd-container">
      <div className="pd-left">
        <div className="pd-main-image">
          <button className="pd-main-nav left" onClick={prevImg} aria-label="previous image">‹</button>
          <img src={images[imgIndex]} alt="product" />
          <button className="pd-main-nav right" onClick={nextImg} aria-label="next image">›</button>
        </div>

        <div className="pd-thumbs-wrap">
          <button className="pd-nav" onClick={() => scrollThumbs(-200)} aria-label="prev thumbnails">
            ‹
          </button>
          <div className="pd-thumbs" ref={thumbsRef}>
            {images.map((src, i) => (
              <button
                key={i}
                className={`pd-thumb ${i === imgIndex ? "active" : ""}`}
                onClick={() => setImgIndex(i)}
              >
                <img src={src} alt={`thumb-${i}`} />
              </button>
            ))}
          </div>
          <button className="pd-nav" onClick={() => scrollThumbs(200)} aria-label="next thumbnails">
            ›
          </button>
        </div>
      </div>

      <div className="pd-right">
        <h2 className="pd-title">Detan+ Dewy Sunscreen In-Vivo Tested SPF 50+ PA++++</h2>

        <div className="pd-meta">
          <div className="pd-rating">4.7 ★</div>
          <div className="pd-reviews">1163 reviews</div>
        </div>

        <div className="pd-net">Net content: 50g</div>

        <div className="pd-price-block">
          <div className="pd-price">₹449</div>
          <div className="pd-usp">USP: ₹8.98/g</div>
        </div>

        <div className="pd-sizes-section">
          <div className="pd-sizes-label">Select Size</div>
          <div className="pd-sizes-wrap">
            <button className="pd-nav small" onClick={prevSize} aria-label="prev sizes">‹</button>
            <div className="pd-sizes" ref={sizesRef}>
              {sizes.map((s, i) => (
                <div
                  key={i}
                  className={`pd-size-item ${i === selectedSize ? "selected" : ""}`}
                  onClick={() => selectSize(i)}
                >
                  <div className="size-label">{s.label}</div>
                  <div className="size-price">{s.price}</div>
                </div>
              ))}
            </div>
            <button className="pd-nav small" onClick={nextSize} aria-label="next sizes">›</button>
          </div>
        </div>

        <div className="pd-cta-row">
          <button className="add-to-cart">Add to cart</button>
        </div>

        <div className="pd-desc">
          <h3>What's In It?</h3>
          <p>
            A lightweight, non-greasy sunscreen with cherry tomato extract and hydrating actives that protects
            against UV A/B and blue light. Gives dewy finish with no white cast. Dermatologically tested.
          </p>
        </div>
      </div>
    </div>
  );
}

