import {transactions} from "@amxx/graphprotocol-utils";
import {
  BuyInvoice,
  RepayInvoice,
  RewardsWithdrawed,
  RoleAdminChanged,
} from "../generated/Factoring/Factoring";
import {Purchase, Invoice} from "../generated/schema";

export function handleBuyInvoice(event: BuyInvoice): void {
  let invoice = Invoice.load("invoice/".concat(event.params.invoiceId.toString()));
  const purchase = new Purchase("purchase/".concat(transactions.log(event).id));
  purchase.amount = event.params.amount;
  purchase.buyer = event.params.buyer;
  purchase.transaction = transactions.log(event).id;
  purchase.timestamp = event.block.timestamp;
  purchase.emitter = event.address;

  if (invoice) {
    purchase.invoice = invoice.id;
  }
  purchase.save();
}

export function handleRepayInvoice(event: RepayInvoice): void {}

export function handleRewardsWithdrawed(event: RewardsWithdrawed): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}
