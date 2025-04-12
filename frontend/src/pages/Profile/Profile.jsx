import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import './Profile.scss';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'Ján',
    surname: 'Novák',
    email: 'jan.novak@example.com',
    phone: '+421 123 456 789',
    address: 'Hlavná 15, 123 45 Naše Mesto',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    notifications: true,
    newsletter: true,
    verified: true
  });
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Potvrdenie o trvalom pobyte', date: '15.03.2023', status: 'active' },
    { id: 2, name: 'Žiadosť o stavebné povolenie', date: '02.01.2023', status: 'pending' },
    { id: 3, name: 'Doklad o zaplatení poplatku', date: '22.12.2022', status: 'expired' }
  ]);
  const [services, setServices] = useState([
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [paymentForm, setPaymentForm] = useState({
    municipality: '',
    taxType: '',
    amount: '',
    name: 'Ján',
    surname: 'Novák',
    address: 'Hlavná 15, 123 45 Naše Mesto',
    email: 'jan.novak@example.com'
  });
  const [receiptData, setReceiptData] = useState(null);
  const [showTaxPayment, setShowTaxPayment] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedTax, setSelectedTax] = useState({
    id: 1,
    name: 'Daň z nehnuteľností',
    description: 'Ročná daň za vlastníctvo nehnuteľnosti',
    amount: 120.50,
    dueDate: '15.12.2023',
    paid: false,
    receiptNumber: 'INV-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  });

  // Local taxes data
  const [localTaxes] = useState([
    {
      id: 1,
      name: 'Daň z nehnuteľností',
      description: 'Ročná daň za vlastníctvo nehnuteľnosti',
      amount: 120.50,
      dueDate: '15.12.2023',
      paid: false
    },
    {
      id: 2,
      name: 'Poplatok za psa',
      description: 'Ročný poplatok za držanie psa',
      amount: 25.00,
      dueDate: '31.03.2023',
      paid: true,
      receipt: '#'
    },
    {
      id: 3,
      name: 'Komunálny odpad',
      description: 'Ročný poplatok za odvoz odpadu',
      amount: 75.00,
      dueDate: '30.06.2023',
      paid: false
    }
  ]);

  // Voting state
  const [activePolls, setActivePolls] = useState([
    {
      id: 1,
      title: 'Rozšírenie cyklochodníkov v centre mesta',
      description: 'Hlasovanie o rozšírení cyklochodníkov na Hlavnej a Štúrovej ulici.',
      endDate: '15.12.2023',
      voted: false,
      options: [
        { id: 1, text: 'Súhlasím', votes: 1245 },
        { id: 2, text: 'Nesúhlasím', votes: 567 },
        { id: 3, text: 'Nemám názor', votes: 321 }
      ]
    },
    {
      id: 2,
      title: 'Nová podoba mestského parku',
      description: 'Vyberte preferovanú variantu revitalizácie mestského parku.',
      endDate: '20.12.2023',
      voted: true,
      options: [
        { id: 1, text: 'Variant A - Moderný', votes: 892 },
        { id: 2, text: 'Variant B - Prírodný', votes: 1203 },
        { id: 3, text: 'Variant C - Zmiešaný', votes: 756 }
      ]
    }
  ]);

  const [completedPolls] = useState([
    {
      id: 3,
      title: 'Miestny poplatok za odvoz odpadu',
      description: 'Hlasovanie o zvýšení poplatku za odvoz odpadu o 10%.',
      endDate: '01.11.2023',
      result: 'Neschválené (45% pre, 55% proti)',
      totalVotes: 2456
    }
  ]);

  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Pre-fill payment form with user data
    setPaymentForm({
      ...paymentForm,
      name: userData.name,
      surname: userData.surname,
      address: userData.address,
      email: userData.email
    });
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditing(false);
  };

  const handlePayTax = (tax) => {
    setSelectedTax({
      ...tax,
      receiptNumber: 'INV-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    });
    setPaymentAmount(tax.amount);
    setShowTaxPayment(true);
    setPaymentConfirmed(false);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentConfirmed(true);

    // Update the tax status in localTaxes
    const updatedTaxes = localTaxes.map(tax =>
        tax.id === selectedTax.id ? { ...tax, paid: true } : tax
    );

    // Add to services

  };

  const handleDownloadReceipt = () => {
    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const receipt = {
      city: 'Naše Mesto',
      date: now.toLocaleDateString('sk-SK', options) + ' ' + now.toLocaleTimeString('sk-SK', {hour: '2-digit', minute:'2-digit'}),
      issueDate: now.toLocaleDateString('sk-SK', options),
      number: selectedTax.receiptNumber,
      name: userData.name + ' ' + userData.surname,
      address: userData.address,
      email: userData.email,
      taxType: selectedTax.name,
      amount: selectedTax.amount.toFixed(2) + ' €',
      total: selectedTax.amount.toFixed(2) + ' €'
    };

    setReceiptData(receipt);
    handleDownloadPDF();
  };

  const handleEmailReceipt = () => {
    alert('Potvrdenie bolo odoslané na email: ' + userData.email);
  };

  const handleDownloadPDF = () => {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      pdf.setFont('helvetica');

      pdf.setFontSize(18);
      pdf.setTextColor(44, 62, 80);
      pdf.text('Potvrdenie o platbe', 105, 20, { align: 'center' });

      pdf.setFontSize(12);
      pdf.text('Mesto/Obec: ' + receiptData.city, 105, 30, { align: 'center' });
      pdf.text('Dátum vystavenia: ' + receiptData.issueDate, 105, 35, { align: 'center' });

      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, 40, 190, 40);

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      let yPosition = 50;

      const addLine = (label, value) => {
        pdf.text(label + ':', 20, yPosition);
        pdf.text(value, 70, yPosition);
        yPosition += 7;
      };

      addLine('Dátum platby', receiptData.date);
      addLine('Číslo transakcie', receiptData.number);
      addLine('Platiteľ', receiptData.name);
      addLine('Adresa', receiptData.address);
      addLine('Email', receiptData.email);

      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(44, 62, 80);
      pdf.text('Detail platby', 20, yPosition);
      yPosition += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      addLine('Typ platby', receiptData.taxType);
      addLine('Suma', receiptData.amount);

      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setFontStyle('bold');
      pdf.text('Celková suma:', 20, yPosition);
      pdf.text(receiptData.total, 70, yPosition);

      yPosition += 20;
      pdf.setFontSize(10);
      pdf.setFontStyle('italic');
      pdf.setTextColor(100, 100, 100);
      pdf.text('Tento doklad je elektronickým potvrdením platby a nevyžaduje pečiatku ani podpis.', 105, yPosition, { align: 'center' });

      yPosition += 10;
      pdf.setFontSize(12);
      pdf.setFontStyle('bold');
      pdf.setTextColor(44, 62, 80);
      pdf.text('Ďakujeme za vašu platbu!', 105, yPosition, { align: 'center' });

      pdf.save('potvrdenie_platby_' + new Date().toISOString().slice(0,10) + '.pdf');

    } catch (error) {
      console.error('Chyba pri generovaní PDF:', error);
      alert('Nastala chyba pri generovaní PDF. Skúste to prosím znova.');
    }
  };

  const handlePrintReceipt = () => {
    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="sk">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Potvrdenie o platbe</title>
        <style>
          body {
            font-family: 'Helvetica', Arial, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            padding: 20px;
            max-width: 500px;
            margin: 0 auto;
          }
          h1 {
            color: #2c3e50;
            text-align: center;
            font-size: 18pt;
            margin-bottom: 15px;
          }
          .receipt-header {
            text-align: center;
            margin-bottom: 15px;
          }
          .receipt-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px dashed #e2e8f0;
          }
          .receipt-total {
            font-weight: bold;
            border-top: 2px solid #e2e8f0;
            padding-top: 10px;
            margin-top: 10px;
          }
          .receipt-footer {
            font-style: italic;
            color: #718096;
            text-align: center;
            font-size: 10pt;
            margin-top: 30px;
          }
          .receipt-thanks {
            text-align: center;
            font-weight: bold;
            margin-top: 15px;
            font-size: 12pt;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <h1>Potvrdenie o platbe</h1>
        
        <div class="receipt-header">
          <p>Mesto/Obec: <strong>${receiptData.city}</strong></p>
          <p>Dátum vystavenia: ${receiptData.issueDate}</p>
        </div>

        <div class="receipt-details">
          <div class="receipt-item">
            <span>Dátum platby:</span>
            <span>${receiptData.date}</span>
          </div>
          <div class="receipt-item">
            <span>Číslo transakcie:</span>
            <span>${receiptData.number}</span>
          </div>
          <div class="receipt-item">
            <span>Platiteľ:</span>
            <span>${receiptData.name}</span>
          </div>
          <div class="receipt-item">
            <span>Adresa:</span>
            <span>${receiptData.address}</span>
          </div>
          <div class="receipt-item">
            <span>Email:</span>
            <span>${receiptData.email}</span>
          </div>
        </div>

        <div class="receipt-details">
          <h3 style="margin-bottom: 10px;">Detail platby</h3>
          <div class="receipt-item">
            <span>Typ platby:</span>
            <span>${receiptData.taxType}</span>
          </div>
          <div class="receipt-item">
            <span>Suma:</span>
            <span>${receiptData.amount}</span>
          </div>
          <div class="receipt-item receipt-total">
            <span>Celková suma:</span>
            <span>${receiptData.total}</span>
          </div>
        </div>

        <p class="receipt-footer">
          Tento doklad je elektronickým potvrdením platby a nevyžaduje pečiatku ani podpis.
        </p>
        <p class="receipt-thanks">Ďakujeme za vašu platbu!</p>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 200);
          }
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  const handleCancelEdit = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  const handleVoteSubmit = (pollId) => {
    if (!selectedOption) return;

    const updatedPolls = activePolls.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          voted: true,
          options: poll.options.map(opt =>
              opt.id === selectedOption
                  ? { ...opt, votes: opt.votes + 1 }
                  : opt
          )
        };
      }
      return poll;
    });

    setActivePolls(updatedPolls);
    setSelectedPoll(null);
    setSelectedOption(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
            <div className="profile-content">
              {isEditing ? (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                      <label>Meno</label>
                      <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                      />
                    </div>
                    <div className="form-group">
                      <label>Priezvisko</label>
                      <input
                          type="text"
                          name="surname"
                          value={formData.surname}
                          onChange={handleInputChange}
                          required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                      />
                    </div>
                    <div className="form-group">
                      <label>Telefón</label>
                      <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Adresa</label>
                      <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group checkbox-group">
                      <input
                          type="checkbox"
                          id="notifications"
                          name="notifications"
                          checked={formData.notifications}
                          onChange={handleInputChange}
                      />
                      <label htmlFor="notifications">Povoliť notifikácie</label>
                    </div>
                    <div className="form-group checkbox-group">
                      <input
                          type="checkbox"
                          id="newsletter"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                      />
                      <label htmlFor="newsletter">Prihlásiť sa na odber noviniek</label>
                    </div>
                    <div className="form-actions">
                      <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                        Zrušiť
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Uložiť zmeny
                      </button>
                    </div>
                  </form>
              ) : (
                  <>
                    <div className="profile-info">
                      <div className="info-row">
                        <span className="label">Celé meno:</span>
                        <span className="value">{userData.name} {userData.surname}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Email:</span>
                        <span className="value">{userData.email}</span>
                        {userData.verified && <span className="verified-badge">Overený</span>}
                      </div>
                      <div className="info-row">
                        <span className="label">Telefón:</span>
                        <span className="value">{userData.phone || 'Nie je uvedený'}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Adresa:</span>
                        <span className="value">{userData.address || 'Nie je uvedená'}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Notifikácie:</span>
                        <span className="value">{userData.notifications ? 'Zapnuté' : 'Vypnuté'}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Novinky:</span>
                        <span className="value">{userData.newsletter ? 'Prihlásený' : 'Neprihlásený'}</span>
                      </div>
                    </div>
                    <button className="btn btn-primary edit-btn" onClick={() => setIsEditing(true)}>
                      Upraviť profil
                    </button>
                  </>
              )}
            </div>
        );
      case 'documents':
        return (
            <div className="documents-content">
              <h3>Moje dokumenty</h3>
              {documents.length > 0 ? (
                  <div className="documents-list">
                    {documents.map((doc) => (
                        <div key={doc.id} className="document-card">
                          <div className="document-icon">
                            <i className="fas fa-file-alt"></i>
                          </div>
                          <div className="document-info">
                            <h4>{doc.name}</h4>
                            <p>Dátum: {doc.date}</p>
                            <span className={`status-badge ${doc.status}`}>
                        {doc.status === 'active' && 'Aktívny'}
                              {doc.status === 'pending' && 'Čaká na spracovanie'}
                              {doc.status === 'expired' && 'Expirovaný'}
                      </span>
                          </div>
                          <div className="document-actions">
                            <button className="btn btn-icon">
                              <i className="fas fa-download"></i>
                            </button>
                            <button className="btn btn-icon">
                              <i className="fas fa-print"></i>
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="empty-state">
                    <i className="fas fa-folder-open"></i>
                    <p>Nemáte žiadne uložené dokumenty</p>
                    <button className="btn btn-primary">Vytvoriť nový dokument</button>
                  </div>
              )}
            </div>
        );
      case 'services':
        return (
            <div className="services-content">
              {showTaxPayment ? (
                  <div className="tax-payment-container">
                    <button
                        className="btn btn-icon back-btn"
                        onClick={() => setShowTaxPayment(false)}
                    >
                      <i className="fas fa-arrow-left"></i> Späť na služby
                    </button>

                    {paymentConfirmed ? (
                        <div className="payment-confirmation">
                          <div className="confirmation-icon">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <h3>Platba úspešná!</h3>
                          <p>Vaša platba dane/poplatku bola úspešne spracovaná.</p>

                          <div className="receipt-download">
                            <h4>Potvrdenie o platbe</h4>
                            <p>Stiahnite si potvrdenie vo formáte PDF:</p>
                            <button
                                className="btn btn-primary"
                                onClick={handleDownloadReceipt}
                            >
                              <i className="fas fa-download"></i> Stiahnuť potvrdenie
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={handlePrintReceipt}
                            >
                              <i className="fas fa-print"></i> Vytlačiť
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={handleEmailReceipt}
                            >
                              <i className="fas fa-envelope"></i> Poslať na email
                            </button>
                          </div>

                          <div className="payment-details">
                            <h4>Detaily platby</h4>
                            <div className="detail-row">
                              <span>Názov:</span>
                              <span>{selectedTax.name}</span>
                            </div>
                            <div className="detail-row">
                              <span>Suma:</span>
                              <span>{selectedTax.amount.toFixed(2)} €</span>
                            </div>
                            <div className="detail-row">
                              <span>Dátum platby:</span>
                              <span>{new Date().toLocaleDateString('sk-SK')}</span>
                            </div>
                            <div className="detail-row">
                              <span>Referenčné číslo:</span>
                              <span>{selectedTax.receiptNumber}</span>
                            </div>
                          </div>
                        </div>
                    ) : (
                        <form onSubmit={handlePaymentSubmit} className="payment-form">
                          <h3>Platba miestnej dane/poplatku</h3>

                          <div className="payment-summary">
                            <h4>{selectedTax.name}</h4>
                            <p>{selectedTax.description}</p>
                            <div className="amount-due">
                              <span>Suma k úhrade:</span>
                              <span className="amount">{selectedTax.amount.toFixed(2)} €</span>
                            </div>
                            <div className="due-date">
                              <span>Splatnosť:</span>
                              <span>{selectedTax.dueDate}</span>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Suma platby (€)</label>
                            <input
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                                required
                            />
                          </div>

                          <div className="form-group">
                            <label>Spôsob platby</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                required
                            >
                              <option value="card">Kreditná/Debetná karta</option>
                              <option value="bank">Bankový prevod</option>
                              <option value="googlepay">Google Pay</option>
                              <option value="applepay">Apple Pay</option>
                            </select>
                          </div>

                          {paymentMethod === 'card' && (
                              <div className="card-details">
                                <div className="form-group">
                                  <label>Číslo karty</label>
                                  <input type="text" placeholder="1234 5678 9012 3456" required />
                                </div>
                                <div className="form-row">
                                  <div className="form-group">
                                    <label>Platná do</label>
                                    <input type="text" placeholder="MM/RR" required />
                                  </div>
                                  <div className="form-group">
                                    <label>CVV/CVC</label>
                                    <input type="text" placeholder="123" required />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label>Meno na karte</label>
                                  <input type="text" placeholder="Ján Novák" required />
                                </div>
                              </div>
                          )}

                          <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                              Potvrdiť platbu
                            </button>
                          </div>
                        </form>
                    )}
                  </div>
              ) : (
                  <>
                    <div className="services-section">
                      <h3>Moje služby</h3>
                      {services.length > 0 ? (
                          <div className="services-list">
                            {services.map((service) => (
                                <div key={service.id} className="service-card">
                                  <div className="service-icon">
                                    {service.status === 'completed' && <i className="fas fa-check-circle completed"></i>}
                                    {service.status === 'in-progress' && <i className="fas fa-spinner in-progress"></i>}
                                    {service.status === 'pending' && <i className="fas fa-clock pending"></i>}
                                  </div>
                                  <div className="service-info">
                                    <h4>{service.name}</h4>
                                    <p>Dátum: {service.date}</p>
                                    <div className="progress-bar">
                                      <div
                                          className={`progress ${service.status}`}
                                          style={{ width: service.status === 'completed' ? '100%' : service.status === 'in-progress' ? '60%' : '30%' }}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="service-actions">
                                    {service.receipt && (
                                        <a
                                            href={service.receiptUrl}
                                            download={`potvrdenie-${service.id}.pdf`}
                                            className="btn btn-icon"
                                        >
                                          <i className="fas fa-file-pdf"></i> Potvrdenie
                                        </a>
                                    )}
                                    <button className="btn btn-secondary">Detaily</button>
                                  </div>
                                </div>
                            ))}
                          </div>
                      ) : (
                          <div className="empty-state">
                            <i className="fas fa-concierge-bell"></i>
                            <p>Nemáte žiadne aktívne služby</p>
                            <button className="btn btn-primary">Využiť služby</button>
                          </div>
                      )}
                    </div>

                    <div className="services-section">
                      <h3>Miestne dane a poplatky</h3>
                      <div className="taxes-intro">
                        <p>Podľa zákona č. 582/2004 Z.z. môžete online platiť tieto miestne dane a poplatky:</p>
                        <ul>
                          <li>Daň z nehnuteľností</li>
                          <li>Daň za psa</li>
                          <li>Daň za užívanie verejného priestranstva</li>
                          <li>Poplatok za komunálne odpady</li>
                          <li>a ďalšie</li>
                        </ul>
                      </div>

                      <div className="taxes-list">
                        {localTaxes.map(tax => (
                            <div key={tax.id} className="tax-card">
                              <div className="tax-info">
                                <h4>{tax.name}</h4>
                                <p>{tax.description}</p>
                                <div className="tax-meta">
                                  <span className="amount">{tax.amount.toFixed(2)} €</span>
                                  <span className={`status ${tax.paid ? 'paid' : 'unpaid'}`}>
                              {tax.paid ? 'Zaplatené' : 'Nezaplatené'}
                            </span>
                                  <span className="due-date">Splatnosť: {tax.dueDate}</span>
                                </div>
                              </div>
                              <div className="tax-actions">
                                {tax.paid ? (
                                    <a
                                        href={tax.receipt}
                                        download={`potvrdenie-${tax.name.toLowerCase().replace(/ /g, '-')}.pdf`}
                                        className="btn btn-secondary"
                                    >
                                      <i className="fas fa-file-pdf"></i> Potvrdenie
                                    </a>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handlePayTax(tax)}
                                    >
                                      Zaplatiť
                                    </button>
                                )}
                              </div>
                            </div>
                        ))}
                      </div>

                    </div>
                  </>
              )}
            </div>
        );
      case 'voting':
        return (
            <div className="voting-content">
              <div className="tabs">
                <button
                    className={`tab-btn ${selectedPoll ? '' : 'active'}`}
                    onClick={() => setSelectedPoll(null)}
                >
                  Aktívne hlasovania
                </button>
                <button
                    className={`tab-btn ${selectedPoll ? 'active' : ''}`}
                    disabled={!selectedPoll}
                >
                  Detail hlasovania
                </button>
              </div>

              {!selectedPoll ? (
                  <>
                    <h3>Aktívne hlasovania</h3>
                    {activePolls.length > 0 ? (
                        <div className="polls-list">
                          {activePolls.map(poll => (
                              <div key={poll.id} className="poll-card">
                                <div className="poll-header">
                                  <h4>{poll.title}</h4>
                                  <span className="end-date">Do {poll.endDate}</span>
                                </div>
                                <p>{poll.description}</p>
                                <div className="poll-status">
                                  {poll.voted ? (
                                      <span className="voted-badge">
                              <i className="fas fa-check-circle"></i> Už ste hlasovali
                            </span>
                                  ) : (
                                      <span className="active-badge">
                              <i className="fas fa-vote-yea"></i> Čaká na váš hlas
                            </span>
                                  )}
                                </div>
                                <div className="poll-actions">
                                  <button
                                      className="btn btn-primary"
                                      onClick={() => setSelectedPoll(poll)}
                                      disabled={poll.voted}
                                  >
                                    {poll.voted ? 'Zobraziť výsledky' : 'Hlasovať'}
                                  </button>
                                </div>
                              </div>
                          ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                          <i className="fas fa-box-open"></i>
                          <p>Momentálne nie sú k dispozícii žiadne aktívne hlasovania</p>
                        </div>
                    )}

                    <h3 style={{ marginTop: '40px' }}>Ukončené hlasovania</h3>
                    {completedPolls.length > 0 ? (
                        <div className="polls-list">
                          {completedPolls.map(poll => (
                              <div key={poll.id} className="poll-card">
                                <div className="poll-header">
                                  <h4>{poll.title}</h4>
                                  <span className="end-date">Ukončené {poll.endDate}</span>
                                </div>
                                <p>{poll.description}</p>
                                <div className="poll-result">
                                  <i className="fas fa-poll"></i> Výsledok: {poll.result}
                                </div>
                                <div className="poll-actions">
                                  <button className="btn btn-secondary">
                                    Detailné výsledky
                                  </button>
                                </div>
                              </div>
                          ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                          <i className="fas fa-box-open"></i>
                          <p>Žiadne ukončené hlasovania</p>
                        </div>
                    )}
                  </>
              ) : (
                  <div className="poll-detail">
                    <button
                        className="btn btn-icon back-btn"
                        onClick={() => setSelectedPoll(null)}
                    >
                      <i className="fas fa-arrow-left"></i> Späť na hlasovania
                    </button>

                    <h3>{selectedPoll.title}</h3>
                    <p className="poll-description">{selectedPoll.description}</p>
                    <div className="poll-meta">
                      <span><i className="fas fa-calendar-alt"></i> Koniec hlasovania: {selectedPoll.endDate}</span>
                      {selectedPoll.voted && (
                          <span className="voted-notice">
                      <i className="fas fa-check-circle"></i> Už ste hlasovali
                    </span>
                      )}
                    </div>

                    {selectedPoll.voted ? (
                        <div className="poll-results">
                          <h4>Výsledky hlasovania</h4>
                          {selectedPoll.options.map(option => (
                              <div key={option.id} className="result-item">
                                <div className="result-label">
                                  <span>{option.text}</span>
                                  <span>{option.votes} hlasov ({(option.votes / selectedPoll.options.reduce((sum, opt) => sum + opt.votes, 0) * 100).toFixed(1)}%)</span>
                                </div>
                                <div className="result-bar">
                                  <div
                                      className="bar-fill"
                                      style={{
                                        width: `${(option.votes / selectedPoll.options.reduce((sum, opt) => sum + opt.votes, 0)) * 100}%`
                                      }}
                                  ></div>
                                </div>
                              </div>
                          ))}
                        </div>
                    ) : (
                        <div className="poll-voting">
                          <h4>Možnosti hlasovania</h4>
                          <div className="voting-options">
                            {selectedPoll.options.map(option => (
                                <div
                                    key={option.id}
                                    className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedOption(option.id)}
                                >
                                  <div className="option-radio">
                                    {selectedOption === option.id ? (
                                        <i className="fas fa-check-circle"></i>
                                    ) : (
                                        <i className="far fa-circle"></i>
                                    )}
                                  </div>
                                  <div className="option-text">
                                    {option.text}
                                  </div>
                                </div>
                            ))}
                          </div>
                          <button
                              className="btn btn-primary submit-vote"
                              onClick={() => handleVoteSubmit(selectedPoll.id)}
                              disabled={!selectedOption}
                          >
                            Odoslať hlas
                          </button>
                        </div>
                    )}
                  </div>
              )}
            </div>
        );
      case 'settings':
        return (
            <div className="settings-content">
              <h3>Nastavenia účtu</h3>
              <div className="settings-section">
                <h4>Bezpečnosť</h4>
                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Zmena hesla</h5>
                    <p>Posledná zmena: 15.03.2023</p>
                  </div>
                  <button className="btn btn-secondary">Zmeniť heslo</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Dvojfaktorová autentifikácia</h5>
                    <p>Zabezpečte svoj účet dodatočným overením</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={false} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <div className="settings-section">
                <h4>Súkromie</h4>
                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Zdieľanie údajov</h5>
                    <p>Povoliť zdieľanie anonymizovaných údajov pre štatistické účely</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={true} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <div className="settings-section danger-zone">
                <h4>Nebezpečná zóna</h4>
                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Deaktivácia účtu</h5>
                    <p>Dočasne deaktivujte svoj účet</p>
                  </div>
                  <button className="btn btn-outline-danger">Deaktivovať účet</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Odstránenie účtu</h5>
                    <p>Natrvalo odstrániť účet a všetky údaje</p>
                  </div>
                  <button className="btn btn-danger">Odstrániť účet</button>
                </div>
              </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="user-avatar">
            <img src={userData.avatar} alt="User Avatar" />
            <button className="avatar-edit-btn">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="user-greeting">
            <h2>Vitajte, {userData.name}!</h2>
            <p>Členstvo od: 15.03.2022</p>
          </div>
          <div className="user-stats">
            <div className="stat-item">
              <h3>{documents.length}</h3>
              <p>Dokumentov</p>
            </div>
            <div className="stat-item">
              <h3>{services.length}</h3>
              <p>Služby</p>
            </div>
            <div className="stat-item">
              <h3>12</h3>
              <p>Notifikácie</p>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <button
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i> Profil
          </button>
          <button
              className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
          >
            <i className="fas fa-file-alt"></i> Dokumenty
          </button>
          <button
              className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
          >
            <i className="fas fa-concierge-bell"></i> Služby
          </button>
          <button
              className={`tab-btn ${activeTab === 'voting' ? 'active' : ''}`}
              onClick={() => setActiveTab('voting')}
          >
            <i className="fas fa-vote-yea"></i> Hlasovanie
          </button>
          <button
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i> Nastavenia
          </button>
        </div>

        <div className="profile-main">
          {renderTabContent()}
        </div>
      </div>
  );
};

export default Profile;