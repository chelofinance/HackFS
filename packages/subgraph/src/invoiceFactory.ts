import {Factoring} from "../generated/Factoring/Factoring";
import {InvoiceFactory} from "../generated/InvoiceFactory/InvoiceFactory";
import {InvoiceCreated} from "../generated/InvoiceFactory/InvoiceFactory";
import {Invoice} from "../generated/schema";

export function handleInvoiceCreated(event: InvoiceCreated): void {
	const tokenId = event.params.tokenID;
	let invoice = Invoice.load("invoice/".concat(tokenId.toString()));
	const invoiceFactory = InvoiceFactory.bind(event.address);

	if (!invoice) {
		const factoring = Factoring.bind(invoiceFactory.try_factoring().value);
		const invoiceData = factoring.try_invoices(tokenId).value;

		invoice = new Invoice("invoice/".concat(tokenId.toString()));
		invoice.status = invoiceData.value0;
		invoice.repaymentAmount = invoiceData.value1;
		invoice.fractionalPrice = invoiceData.value2;
		invoice.amountRepaid = invoiceData.value3;
		invoice.blockNumber = invoiceData.value4;
		invoice.issuer = invoiceData.value5;
		invoice.receiver = invoiceData.value6;
		invoice.token = invoiceData.value7;
		invoice.save();
	}
}
