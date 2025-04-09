package main

import (
	"context"
	"fmt"
	"log"
	"net"

	pb "go-service/proto"

	"google.golang.org/grpc"
)

type eventServer struct {
	pb.UnimplementedEventProcessorServer
}

func (s *eventServer) ProcessEvent(ctx context.Context, req *pb.EventRequest) (*pb.EventResponse, error) {
	fmt.Printf("Received event from user %s of type %s\n", req.UserId, req.Type)
	return &pb.EventResponse{
			Success: true,
			Message: "Event received",
	}, nil
}


func main() {
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }


    grpcServer := grpc.NewServer()

    pb.RegisterEventProcessorServer(grpcServer, &eventServer{})

    fmt.Println("gRPC server running on :50051")
    if err := grpcServer.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}
