import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CustomerServiceBase } from "./base/customer.service.base";

@Injectable()
export class CustomerService extends CustomerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async greetingCustomer(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      return "Customer not found";
    }

    return `Hello ${customer?.firstName} ${customer?.lastName}`;
  }
}
