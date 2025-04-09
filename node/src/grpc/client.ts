import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDef = protoLoader.loadSync('./src/grpc/event.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDef) as any;

const client = new proto.event.EventProcessor(
  process.env.GRPC_TARGET || 'localhost:50051',
  grpc.credentials.createInsecure()
);

export default client;
