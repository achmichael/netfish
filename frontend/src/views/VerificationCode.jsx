const VerificationCode = ({
  handleVerificationSubmit,
  setVerificationCode,
  verificationCode,
  handleResendVerificationCode,
  success,
}) => {
  return (
    <form onSubmit={handleVerificationSubmit} className="space-y-6">
      <div className="w-full">
        <div className="flex items-center border-b-2 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter your verification code..."
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
      </div>
      <button
        className="w-full py-2 px-4 bg-gradient-to-b from-primary to-secondary hover:bg-maroon-600 text-white font-bold rounded"
        type="submit"
      >
        Verify Email
      </button>
      <div className="text-center py-2 px-4">
        <div className="text-black">
          {!success ? (
            <>
              Belum Menerima Kode Verifikasi?
              <button
                type="button"
                onClick={handleResendVerificationCode}
                className="text-blue-500 font-semibold"
                disabled={success}
              >
                Kirim Ulang
              </button>
            </>
          ) : (
            <p className="text-green-600 font-semibold">
              Kode Verifikasi Berhasil Terkirim ke dalam email anda!
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default VerificationCode;
