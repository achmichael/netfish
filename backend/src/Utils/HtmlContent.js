const htmlContent = (type, verificationCode, resetLink, currentYear) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${type === 'verification' ? 'Email Verifikasi' : 'Reset Password'}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            max-width: 150px; /* Adjusted to be more appropriate */
            height: auto;
        }
        .content {
            font-size: 16px;
            line-height: 1.5;
        }
        .content a {
            color: #1a73e8;
            text-decoration: none;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #1a73e8;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="../assets/logo.jpg" alt="Logo">
        </div>
        <div class="content">
            <h2>${type === 'verification' ? 'Verifikasi Email Anda' : 'Reset Password Anda'}</h2>
            <p>Hai,</p>
            ${type === 'verification' 
                ? `<p>Terima kasih telah mendaftar di Netfish. Untuk menyelesaikan pendaftaran Anda, silakan verifikasi alamat email Anda dengan menggunakan kode verifikasi berikut:</p>
                   <p><strong>Kode verifikasi: ${verificationCode}</strong></p>`
                : `<p>Untuk mereset password Anda, klik tautan berikut:</p>
                   <p><a href="${resetLink}" target="_blank">Reset Password</a></p>`}
            <p>Jika Anda tidak melakukan tindakan ini, Anda dapat mengabaikan email ini.</p>
            <p>Terima kasih,<br>Netfish Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${currentYear} Netfish. Semua hak cipta dilindungi.</p>
            <p><a href="https://yourdomain.com">Kunjungi website kami</a></p>
        </div>
    </div>
</body>
</html>
`;

export default htmlContent;
