import { capturePayment, generateClientToken } from './services/braintree-api.js'; // Replace with the correct path to your module
import { expect } from 'chai';
import fetch from 'node-fetch';
import braintree from 'braintree';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

// Mock the dependencies
const sandbox = sinon.createSandbox();
const mockGateway = { transaction: { sale: sandbox.stub() } };
const mockClientToken = 'mockedClientToken';
const mockGenerateClientToken = sandbox.stub().resolves(mockClientToken);
sandbox.stub(braintree, 'BraintreeGateway').returns(mockGateway);
sandbox.stub(braintree, 'Environment').value({ Sandbox: 'sandbox' });

describe('Payment Functions', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('capturePayment', () => {
    it('should return "Payment received" when payment is successful', async () => {
      const mockResult = { success: true };
      mockGateway.transaction.sale.resolves(mockResult);

      const result = await capturePayment('mockedNonce', '100');

      expect(result).to.equal('Payment received');
    });

    it('should return "Payment failed" when payment is not successful', async () => {
      const mockResult = { success: false };
      mockGateway.transaction.sale.resolves(mockResult);

      const result = await capturePayment('mockedNonce', '100');

      expect(result).to.equal('Payment failed');
    });

    it('should return "Payment failed" when an error occurs', async () => {
      mockGateway.transaction.sale.rejects(new Error('Some error'));

      const result = await capturePayment('mockedNonce', '100');

      expect(result).to.equal('Payment failed');
    });
  });

  describe('generateClientToken', () => {
    it('should generate a client token', async () => {
      mockGateway.clientToken = { generate: mockGenerateClientToken };

      const result = await generateClientToken();

      expect(result).to.equal(mockClientToken);
    });

    it('should handle errors during client token generation', async () => {
      const errorMessage = 'Client token generation error';
      mockGenerateClientToken.rejects(new Error(errorMessage));

      try {
        await generateClientToken();
        throw new Error('Test case should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }
    });
  });
});
